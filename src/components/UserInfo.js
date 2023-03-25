export default class UserInfo {
    constructor({ profileTitle, profileAbout, profileAvatar }) {
        this._profileTitle = profileTitle;
        this._profileAbout = profileAbout;
        this._profileAvatar = profileAvatar;

    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        }
    }

    setUserUnfo({ name, about, avatar }) {
        this._name = name;
        this._about = about;
        this._avatar = avatar;
        this._profileTitle.textContent = this._name;
        this._profileAbout.textContent = this._about;
        this._profileAvatar.src = this._avatar;
    }
}
