import Html from "../Html/Html";
import Api from "../api/Api";
import { type } from "os";
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

  renderNavMenu() {
    const navLinks = ["Categories", "Actors", "Movies"];

    const navMenu = Html()
      .create("nav")
      .addClass("nav-menu");
    const navMenuList = Html()
      .create("ul")
      .addClass("nav-menu__list");

    navLinks.forEach(link => {
      const navListItem = Html()
        .create("li")
        .addClass("nav-menu__list-item")
        .addChild(
          Html()
            .create("a")
            .addAttribute("href", `/${link}`)
            .text(`${link}`)
            .click(event => {
              event.preventDefault();
              if (link === "Categories") {
                this.renderPageCategories();
              }
              if (link === "Actors") {
                this.renderPageActors();
              }
              if (link === "Movies") {
                this.renderPageMovies();
              }
            })
        );
      navMenuList.addChild(navListItem);
    });

    navMenu.addChild(navMenuList);

    return navMenu;
  }

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

  renderContentBlock(requestedData) {
    const contentBlock = Html()
      .create("section")
      .addClass("content-block");

    const contentTitle = Html()
      .create("h2")
      .addClass("content-title")
      .text(requestedData);

    const contentList = Html()
      .create("ul")
      .addClass("content-list");

    Api().getRequest(
      `http://localhost:3000/api/${requestedData}`,
      responseCollection => {
        responseCollection.forEach(item => {
          let name;
          if (requestedData === "actors") {
            name = `${item.firstName} ${item.lastName}`;
          }
          if (requestedData === "categories") {
            name = `${item.name}`;
          }
          if (requestedData === "movies") {
            name = `${item.title}`;
          }
          const contentBlockListItem = Html()
            .create("li")
            .addClass("content-block__list-item")
            .addChild(
              Html()
                .create("a")
                .addAttribute("href", `${requestedData}/${item._id}`)
                .text(name)
                .click(event => {
                  event.preventDefault();

                  const endpoint = event.target.getAttribute("href");

                  Api().getRequest(
                    `http://localhost:3000/api/${endpoint}`,
                    data => {
                      const typeOfObject = endpoint.split("/")[0];
                      if (typeOfObject === "actors") {
                        this.renderPageActor(data);
                      }
                      if (typeOfObject === "categories") {
                        this.renderPageCategory(data);
                      }
                      if (typeOfObject === "movies") {
                        this.renderPageMovie(data);
                      }
                    }
                  );
                })
            );
          contentList.addChild(contentBlockListItem);
        });
      }
    );

    contentBlock.addChild(contentTitle);
    contentBlock.addChild(contentList);
    return contentBlock;
  }

  renderPageActor(data) {
    const currentMainContentContainer = this.getWrapperDiv()
      .select(".content")
      .select(".container")
      .select(".content-block");

    const actorName = Html()
      .create("h3")
      .addClass("content-title")
      .text(`${data.firstName} ${data.lastName}`);

    const actorPic = Html()
      .create("img")
      .addClass("actor-picture")
      .addAttribute("src", `${data.image}`);

    currentMainContentContainer.replace(actorName);
    currentMainContentContainer.addChild(actorPic);
  }

  renderPageCategory(data) {
    const currentMainContentContainer = this.getWrapperDiv()
      .select(".content")
      .select(".container")
      .select(".content-block");

    const categoryName = Html()
      .create("h3")
      .addClass("content-title")
      .text(data.name);

    const movieList = Html()
      .create("ul")
      .addClass("content-list");

    data.movies.forEach(movie => {
      const movieElement = Html()
        .create("li")
        .addClass("content-list__item")
        .addClass("content-list__item--movieCard")
        .text(movie.title);

      const moviePic = Html()
        .create("img")
        .addClass("movie-picture")
        .addAttribute("src", `${movie.image}`)
        .text(movie.title)
        .addAttribute("href", `/${movie._id}`)
        .click(event => {
          event.preventDefault();

          const endpoint = event.target.getAttribute("href");

          Api().getRequest(
            `http://localhost:3000/api/movies/${endpoint}`,
            data => {
              this.renderPageMovie(data);
            }
          );
        });

      movieElement.addChild(moviePic);
      movieList.addChild(movieElement);
    });

    currentMainContentContainer.replace(categoryName);
    currentMainContentContainer.addChild(movieList);
  }

  renderPageMovie(data) {
    const currentMainContentContainer = this.getWrapperDiv()
      .select(".content")
      .select(".container")
      .select(".content-block");

    const movieTitle = Html()
      .create("h2")
      .addClass("content-title")
      .text(`${data.title}`);

    const movieDirector = Html()
      .create("h3")
      .addClass("content-title")
      .text(`Directed By: ${data.director}`);

    const moviePicture = Html()
      .create("img")
      .addClass("movie-picture")
      .addClass("movie-picture--singleMovie")
      .addAttribute("src", `${data.image}`);

    const rating = Html()
      .create("h4")
      .addClass("movie-rating")
      .text(`Rotten Tomatoes Score: ${data.rating}%`);

    currentMainContentContainer.replace(movieTitle);
    currentMainContentContainer.addChild(movieDirector);
    currentMainContentContainer.addChild(moviePicture);
    currentMainContentContainer.addChild(rating);
  }

  renderPageActors() {
    const currentMainContentContainer = this.getWrapperDiv()
      .select(".content")
      .select(".container");

    currentMainContentContainer.replace(this.renderContentBlock("actors"));
  }

  renderPageCategories() {
    const currentMainContentContainer = this.getWrapperDiv()
      .select(".content")
      .select(".container");

    currentMainContentContainer.replace(this.renderContentBlock("categories"));
  }

  renderPageMovies() {
    const currentMainContentContainer = this.getWrapperDiv()
      .select(".content")
      .select(".container");

    currentMainContentContainer.replace(this.renderContentBlock("movies"));
  }

  renderMainContent(requestedData) {
    const mainContent = Html()
      .create("main")
      .addClass("content");

    const containerDiv = Html()
      .create("div")
      .addClass("container");

    const contentBlock = this.renderContentBlock(requestedData);
    containerDiv.addChild(contentBlock);
    mainContent.addChild(containerDiv);
    return mainContent;
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

  renderPageHome() {
    const app = this.getAppContext();
    const wrapperDiv = this.getWrapperDiv();
    const mainHeader = this.renderMainHeader();
    const mainContent = this.renderMainContent("categories");
    const navMenu = this.renderNavMenu();
    const mainFooter = this.renderMainFooter();
    wrapperDiv.addChild(mainHeader);
    wrapperDiv.addChild(navMenu);
    wrapperDiv.addChild(mainContent);
    wrapperDiv.addChild(mainFooter);
    app.replace(wrapperDiv);
  }
}
