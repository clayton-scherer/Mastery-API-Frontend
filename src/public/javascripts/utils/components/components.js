import Html from "../Html/Html";
import Api from "../api/Api";
export default () => new Components();

class Components {
  getAppContext() {
    return Html().select("#app");
  }

  getWrapperDiv() {
    return Html()
      .create("div")
      .addClass("wrapper");
  }

  //   renderNavMenu() {
  //     const navLinks = ["Home", "About", "Movies", "Actors", "Categories"];

  //     const navMenu = Html()
  //       .create("nav")
  //       .addClass("nav-menu")
  //       .addChild(
  //         Html()
  //           .create("ul")
  //           .addClass("nav-menu__list")
  //           .addChild(
  //             navLinks.forEach(link => {
  //               Html()
  //                 .create("li")
  //                 .addClass("nav-menu__list-item")
  //                 .addChild("a")
  //                 .addAttribute(href, `/${link}`);
  //             })
  //           )
  //       );
  //     return navMenu;
  //   }

  renderMainHeader() {
    const mainHeader = Html()
      .create("header")
      .addClass("header")
      .addChild(
        Html()
          .create("h1")
          .addClass("header-title")
          .text("MoviFlix")
      );
    return mainHeader;
  }

  renderMainFooter() {
    const mainFooter = Html()
      .create("footer")
      .addClass("footer");

    const mainFooterCopy = Html()
      .create("small")
      .addClass("copy")
      .html("&copy; 2019 MoviFlix");
    mainFooter.addChild(mainFooterCopy);
    return mainFooter;
  }

  //   renderContentBlock(requestedData) {
  //     const contentBlock = Html()
  //       .create("section")
  //       .addClass("content-block");

  //     const contentTitle = Html()
  //       .create("h2")
  //       .addClass("content-title");

  //     const contentList = Html()
  //       .create("ul")
  //       .addClass("content-list");
  //   }

  renderPageHome() {
    const app = this.getAppContext();
    const wrapperDiv = this.getWrapperDiv();
    const mainHeader = this.renderMainHeader();
    //  const navMenu = this.renderNavMenu();
    //  const mainContent = this.renderContentBlock();
    const mainFooter = this.renderMainFooter();
    wrapperDiv.addChild(mainHeader);
    //  wrapperDiv.addChild(navMenu);
    //  wrapperDiv.addChild(mainContent);
    wrapperDiv.addChild(mainFooter);
    app.replace(wrapperDiv);
  }
}
