import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import ViteRestart from "vite-plugin-restart";
import AutoImport from 'unplugin-auto-import/vite'
import Components from "unplugin-vue-components/vite";
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import {
    AntDesignVueResolver,
    VueUseComponentsResolver,
} from "unplugin-vue-components/resolvers";

export default () => {
    return [
        vue(),

        // 文件路由
        Pages({
            extensions: ["vue", "tsx"],
        }),

        // 布局系统
        Layouts(),

        // api 自动按需引入
        AutoImport({
            imports: [
                'vue',
                'pinia',
                'vue-router',
                '@vueuse/head',
                '@vueuse/core',
            ],
            dts: 'src/auto-imports.d.ts',
        }),

        // 预设热重启服务
        ViteRestart({
            restart: [".env*", "plugin/index.[jt]s"],
        }),

        // 组件自动按需引入
        Components({
            extensions: ["vue", "tsx"],
            include: [/\.vue$/, /\.tsx$/],
            dts: 'src/components.d.ts',
            resolvers: [AntDesignVueResolver(), VueUseComponentsResolver()],
        }),

        // tsx 支持
        vueJsx(),

        // 原子css -unocss
        Unocss()
    ];
};
