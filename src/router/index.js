import {createMemoryHistory, createRouter} from 'vue-router'
import HomeView from "../views/HomeView.vue";
import WorkView from "../views/WorkView.vue";
import PetsView from "../views/pets/PetsView.vue";
import ClothesView from "../views/clothes/ClothesView.vue";
import SongListView from "../views/SongListView.vue";
import GiftView from "../views/gift/GiftView.vue";
import BaseRouter from "../components/BaseRouter.vue";
import ClothesDetailView from "../views/clothes/ClothesDetailView.vue";
import VoiceView from "../views/VoiceView.vue";
import PetsDetail from "../views/pets/PetsDetail.vue";
import GiftMonthSelect from "../views/gift/GiftMonthSelect.vue";
import GiftDetail from "../views/gift/GiftDetail.vue";


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
    {
        path: '/pets',
        component: BaseRouter,
        meta: {title: '栞栞家的小动物'},
        children: [{
            path: '',
            component: PetsView,
        }, {
            path: 'detail',
            component: PetsDetail
        }]
    },
    {
        path: '/gift',
        component: BaseRouter,
        meta: {title: '舰礼存档'},
        children: [{
            path: '',
            component: GiftView,
        }, {
            path: 'month',
            component: GiftMonthSelect,
        }, {
            path: 'detail',
            component: GiftDetail
        }]
    },
    {path: '/song', component: SongListView, meta: {title: '歌单'}},
    {path: '/voice', component: VoiceView, meta: {title: '小栞按钮'}},
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})
