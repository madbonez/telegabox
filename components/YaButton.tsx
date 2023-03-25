/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
const clientId = '2c78397a07bb4082a9ce340ca688c0d7'
const url = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}`;

export const YaButton = () => (
  <a id="enter" href={url}>
    <img className="doc-c-image doc-c-image" 
      src="https://yastatic.net/s3/doc-binary/freeze/ru/id/816840a644c625b1bf570b6351bdf6e4221538c5.svg"></img>
  </a>
)