import { Swipe, SwipeItem, Popup, Button, Field, CellGroup } from "vant";
// 放入数组中
let plugins = [Swipe, SwipeItem, Popup, Button, Field, CellGroup];
export default function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item);
  });
}
