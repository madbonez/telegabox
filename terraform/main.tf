terraform {
  required_providers {
    yandex = {
      source = "yandex-cloud/yandex"
    }
    template = {
      source = "hashicorp/template"
      version = "2.2.0"
    }
  }
  required_version = ">= 0.13"
}

provider "yandex" {
  zone = "ru-central1-a"
}

provider "template" {
  # Configuration options
}

resource "yandex_function" "get-token" {
    name               = "get-token"
    description        = "change yandex code to oauth token"
    user_hash          = uuid()
    runtime            = "nodejs16"
    entrypoint         = "index.handler"
    memory             = "128"
    execution_timeout  = "10"
    service_account_id = "ajefhv2s2lhfrgadpcmj"
    content {
        zip_filename = "../functions/dist/get-token.zip"
    }
}

resource "yandex_function" "authorization" {
    name               = "authorization"
    description        = "authorization function"
    user_hash          = uuid()
    runtime            = "nodejs16"
    entrypoint         = "index.handler"
    memory             = "128"
    execution_timeout  = "10"
    service_account_id = "ajefhv2s2lhfrgadpcmj"
    content {
        zip_filename = "../functions/dist/authorization.zip"
    }
}

data "template_file" "openapi" {
  template = "${file("../gateway/openapi.yml")}"
  vars = {
    function_id = "${yandex_function.authorization.id}"
  }
}
resource "yandex_api_gateway" "telegabox-api-gateway" {
  name        = "gw-telegabox"
  description = "telegabox reverse proxy"
  spec = "${data.template_file.openapi.rendered}"
}
