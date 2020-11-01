export default class UserInfo{
  constructor({nameSelector, infoSelector}){
    this._name= document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }
  getUserInfo(){
    return {name: this._name.textContent,
            info: this._info.textContent}
  }
  setUserInfo(obj){
    this._name.textContent = obj.fullname;
    this._info.textContent = obj.job;
  }
}
