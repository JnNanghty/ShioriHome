import {createMemoryHistory, createRouter} from 'vue-router'
import HomeView from "../views/HomeView.vue";
import WorkView from "../views/WorkView.vue";
import PetsView from "../views/pets/PetsView.vue";
import ClothesView from "../views/clothes/ClothesView.vue";
import SongListView from "../views/SongListView.vue";
import GiftView from "../views/GiftView.vue";
import BaseRouter from "../components/BaseRouter.vue";
import ClothesDetailView from "../views/clothes/ClothesDetailView.vue";


export const routes = [
  {path: '/', component: HomeView, meta: {title: '首页'}},
  {path: '/work', component: WorkView, meta: {title: '作品'}},
  {
    path: '/clothes',
    component: BaseRouter,
    meta: {title: '小栞衣柜'},
    children: [{
      path: '',
      component: ClothesView,
    }, {
      path: 'detail',
      component: ClothesDetailView,
    }]
  },
  {path: '/pets', component: PetsView, meta: {title: '栞栞家的小动物'}},
  {path: '/gift', component: GiftView, meta: {title: '舰礼存档'}},
  {path: '/song', component: SongListView, meta: {title: '歌单'}},
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
