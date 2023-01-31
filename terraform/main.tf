terraform {
  required_providers {
    yandex = {
      source = "yandex-cloud/yandex"
    }
  }
  required_version = ">= 0.13"
}

provider "yandex" {
  zone = "ru-central1-a"
}

resource "yandex_function" "get-token" {
    name               = "get-token"
    description        = "change yandex code to oauth token"
    user_hash          = "get-token-0.0.1"
    runtime            = "nodejs16"
    entrypoint         = "index"
    memory             = "128"
    execution_timeout  = "10"
    service_account_id = "ajefhv2s2lhfrgadpcmj"
    content {
        zip_filename = "../functions/dist/get-token.zip"
    }
}

output "yandex_function_get-token-function" {
    value = "${yandex_function.get-token.id}"
}