export default class UserInfo{
  constructor({nameSelector, infoSelector, avatarSelector}){
    this._name= document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo(){
    return {name: this._name.textContent,
            info: this._info.textContent}
  }
  setUserInfo(obj){
    this._name.textContent = obj.fullname;
    this._info.textContent = obj.job;
    if (obj.avatar){
      this.setAvatar(obj.avatar)
    };
  }
  setAvatar(link){
    this._avatar.src = link;
  }
}
