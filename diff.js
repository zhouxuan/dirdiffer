'use strict'

var walkfiles = require('walkfiles');
var md5 = require('md5');
var fs = require('fs');

function doDiff (oridir, basedir, extension) {
	if (!oridir || !basedir) {
		console.log('Error: The file path is necessary!');
		return;
	} 

	if(!fs.existsSync(oridir) || !fs.statSync(oridir).isDirectory()){
        console.log('The original path must be a directory!');
	    return false;
    }

	if(!fs.existsSync(basedir) || !fs.statSync(basedir).isDirectory()){
        console.log('The trunk path must be a directory!');
	    return false;
    }
	var oriFileList = getMd5List(oridir, extension);
	var baseFileList = getMd5List(basedir, extension);
	var diffList = [];

    oriFileList.forEach(function(item){
    	var fullName = item['fullName'];
    	var lastName = item['lastName'];
    	var md5 = item['md5'];
    	var isNew = true;
    	baseFileList.forEach(function(one){
			if(one['lastName'] == lastName){
				isNew = false;
    			//差异文件
				if(one['md5'] != md5) diffList.push(fullName);
			}
    	});
    	//新增文件
    	if(isNew){
			diffList.push(fullName);
    	}
    });

	console.log('diff list:');
	console.log(diffList.join('\n\r'));
    return diffList;
};

function getMd5List(path, fileType){
	var md5List = [];
	var reg = new RegExp(path);
	var fileList = walkfiles(path, fileType); 

	//md5 { fullName: 全路径文件名, lastName: 相对路径文件名, md5: md5 message},
    fileList.forEach(function(item, i){
		var contentText = fs.readFileSync(item,'utf-8');

		md5List[i] = {};
		md5List[i]['fullName'] = item;
		md5List[i]['lastName'] = item.replace(reg,'');
		md5List[i]['md5'] = md5(contentText);
    });

    return md5List;
}

module.exports = doDiff;

//console.log(process.argv.slice(2));
// var path1 = '';
// var path2 = __dirname + '/_views/common1';


// doDiff(path1, path2);