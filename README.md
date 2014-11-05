# Lobster

Node Coding challenge for Lob

![Lobster Screenshot](http://i.danmasq.com/cap.1415207899.png)

## Install

Assuming `Node 10.33` and `HomeBrew`:

```bash
# OSX:
./install.sh
```

## Time

2 - 4 Hours

## Description

Build an API that accepts a PDF file, converts it to a PNG file, and then responds with a URL to the PNG file.

## Input

File and name of file are provided via an API endpoint:
* Endpoint: /upload
* Method: POST
* Body: 
  * name -  name of the file to be referenced later
  * file - PDF file

## Output:

* One PNG thumbnail for each page of the PDF input
* Each thumbnail should be saved to the thumbs directory
* Each thumbnail should be saved with the format <name>_thumb_<page_number>.png
  * i.e. You can view the created thumbnails by going to `http://localhost:8000/thumbs/<file_name>`

* Response:
  * array of objects that have a name and url key
  * i.e. `[{ name: "myupload", url: 'http://localhost:8000/thumbs/myupload_thumb_page_1.png'}]`

## Limitations
* Start with the Hapi (https://github.com/hapijs/hapi) skeleton provided by Lob
* You may not use any Node packages for the file conversion (such as https://github.com/rsms/node-imagemagick)
* You may use any of the core Node APIs (http://nodejs.org/api/all.html)
* You may use any of the modules included in the package.json
* You may use outside command line programs such as:
  * http://www.imagemagick.org/ 
  * http://www.graphicsmagick.org/
  * https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/

## Cheatcodes used...
* Added Bluebird to prevent callback pyramids:
  * https://github.com/petkaantonov/bluebird/
