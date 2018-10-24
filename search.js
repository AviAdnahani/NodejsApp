
var ext = process.argv[2];
var str = process.argv[3];

var path = require('path')
var fs = require('fs')

function FindWordInFile(root,ext,files,res) 
{
    files = files || fs.readdirSync(root) 
    res = res || [] 

    files.forEach( 
        function (file) {
            var newroot = path.join(root,file)
            if ( fs.statSync(newroot).isDirectory() )
            {
                FindWordInFile(newroot,ext,fs.readdirSync(newroot),res)
            }
            else
            {
                if ( file.substr(-1*(ext.length+1)) == '.' + ext)
                {      
                    if ( fs.readFileSync(newroot, 'utf8').search(str) != -1) {
                        res.push(newroot)
                        console.log(newroot)
                    }    
                } 
            }
        }
    )
    return res
}
array = FindWordInFile(__dirname,ext);

if (array === undefined || array.length == 0) console.log("no file was found")