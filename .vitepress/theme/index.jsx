// .vitepress/theme/index.jsx
import DefaultTheme from "vitepress/theme-without-fonts";
import { h } from "vue";
import "./app.css";
import "./fonts.css";

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "nav-bar-content-after": () =>
        h("div", { class: "button-container" }, [
          h(
            "a",
            {
              href: "https://discord.com/invite/metastack",
              target: "_blank",
              class: "metastack-button-outline",
            },
            "Contact Support"
          ),
          h(
            "a",
            {
              href: "https://metastack.gg/login",
              target: "_blank",
              class: "metastack-button",
            },
            "Login"
          ),
        ]),
    });
  },
};
