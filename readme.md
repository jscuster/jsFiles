# JS Files, by Jason Custer #

This program allows users to encode files to data URLs. All files will be stored in a javascript object called jsFiles. By default, the keys to the hash object are the file names, but you can rename these keys.

## How it works. ##

1. Use the file uploader to upload files.
2. Select a file in the dropdown,
3. Change the name in the rename box,
4. click "Update" to save the new name.
5. Type the name of your base object, the files will be <yourBaseObject>.jsFiles. This helps avoid collisions.
6. Finally, click the save button to generate a download link, then right-click and save the file as <filename>.js. Note that the .js extension will likely not be added automatically, so be sure to add it.

To use the encoded files in your project:

1. include the script you saved in the previous steps. *Include it before you need it of course.*
2. To get a file's data url, use your-base-object.jsFiles["your-file-name"]
3. If you feel lost, encode a small file with the previous steps, then look at the resulting script.

Thank you for using JS Files!

