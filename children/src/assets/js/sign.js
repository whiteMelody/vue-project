
import Md5 from './md5_ch.js'

export default{

  privateKey : '7englishSplit6year',
  privateKey2 : '7english@6year',

	getUrlSign(uri,type){

        uri = encodeURI(uri);

		let fileName = uri.substring(uri.indexOf("/",9));
		let _server = uri.substring(0,uri.indexOf("/",9));
		let _timestamp = Math.round(new Date().getTime()/1000) + 1800;
		let _rand = 0;
		let _uid = 0;
		let _PrivateKey = this.privateKey;

        if(type == 'A'){
            let _str = fileName + '-' + _timestamp + '-' + _rand + '-' + _uid + '-' + _PrivateKey;
            let _md5hash = Md5(_str);
            let _str2 = _timestamp + '-' + _rand + '-' + _uid + '-' + _md5hash;
            let uri2 = _server + fileName + '?auth_key=' + _str2;
            return uri2;

        }else if(type == 'B'){

            _timestamp = Math.round(new Date().setSeconds(0).getTime()/1000) + 1800;
            let _md5hash = Md5(_PrivateKey + _timestamp + fileName);
            let uri2 = _server + _timestamp + '/' + _md5hash + fileName;
            return uri2;

        }else if(type == 'C'){

            _timestamp = _timestamp.toString(16);
            let _md5hash = Md5(_PrivateKey + fileName);
            let uri2 = _server + _md5hash + '/' + _timestamp + fileName;
            return uri2;

        }else if(type == 'D'){

            _timestamp = _timestamp.toString(16);
            let _md5hash = Md5(_PrivateKey + fileName);
            let uri2 = _server + fileName + '?KEY1=' + _md5hash + '&KEY2=' + _timestamp;
            return uri2;

        }

        return null;

	}
}

