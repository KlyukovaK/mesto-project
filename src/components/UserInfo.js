export default class UserInfo {
    constructor({ profileTitle, profileAbout, profileAvatar }) {
        this._profileTitle = profileTitle;
        this._profileAbout = profileAbout;
        this._profileAvatar = profileAvatar;

    }

    getUserInfo() {
        return {
            name: this._name,
            about: this._about,
            avatar: this._avatar,
        }
    }

    setUserInfo({ data }) {
        this._name = data.name;
        this._about = data.about;
        this._avatar = data.avatar;
        this._profileTitle.textContent = this._name;
        this._profileAbout.textContent = this._about;
        this._profileAvatar.src = this._avatar;
    }
}
