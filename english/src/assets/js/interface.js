import Superagent from 'superagent';

/**
 * 接口配置
 * @type {{server_url: string, time_out: number}}
 */
const ajaxConfig = {
	server_url : "http://127.0.0.1:3000/",
	debug : false,
}

export default {
  //
  // getUserVideo(callback) {
  //   superagent
  //     .post(ajaxConfig.server_url + "/Ks/Hutui/getUserVideo")
  //     .type('form')
  //     .send({
  //       userid: this.getUserId(),
  //     })
  //     .end((req,res) =>{
  //       if(res.body.code == 1){
  //         callback(res.body.data);
  //       }else{
  //         callback(false, res.body.msg);
  //       }
  //     })
  // },

  getSite(cb){
    Superagent
      .post(ajaxConfig.server_url+"getSite")
      .type('form')
      .end((req,res) =>{
        cb(res.body);
      })
  },

  addSite(cb){
    Superagent
      .post(ajaxConfig.server_url+"addSite")
      .send({
        data: {
          name: '7english',
          type: 'wap',
          url: 'h5.7english.cn',
        }
      })
      .type('form')
      .end((req,res) =>{
        cb(res.body);
      })
  },

  delSite(cb){
    Superagent
      .post(ajaxConfig.server_url+"delSite")
      .type('form')
      .send({
        name: '7english'
      })
      .end((req,res) =>{
        cb(res.body);
      })
  },

}
