# product-hunt-back

## Installation

Installation from the master branch :

1. `git clone https://github.com/Troudaut/product-hunt-back.git`
2. Resolve dependencies: `npm install`.
3. Create a config file named `config.json` at root level (See Settings section)
  

## Settings

The config file need to have this structure : 
```
{
  "port": 3000,
  "productHuntToken": "token"
}
```

You can get a token by login to `ProductHunt` and going to `https://www.producthunt.com/v2/oauth/applications` and following the steps.

## Run

To run the server, launch `npm run server`
