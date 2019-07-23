import Html from "../Html/Html";
import Api from "../api/Api";
export default () => new Components();


class Components {
    renderNavMenu() {
        const navMenu = Html().create("nav").addClass("nav-menu")
        const navList = Html().create("ul").addClass("nav-menu__list")
        const navListItem = Html().create("li").addClass("nav-menu__list-item")

    
    }
    renderMainHeader() {
        const mainHeader = Html()
        .create("header")
        .addClass("header");
        const mainHeaderTitle = Html()
        .create("h1")
        .addClass("header-title")
        .text("Movies");
    }
}