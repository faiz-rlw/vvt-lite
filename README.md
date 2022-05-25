<div align="center">
    <img width="200px" height="200px" src="" />
    <h1>vvt-lite</h1>
    <h2>Vite + Vue3 + Typescript 开发模板</h2>
    <a href="https://github.com/antfu"><h4>借鉴Anthony Fu 大佬的vitess</h4></a>
</div>
<br />
<br />

## 项目地址

```shell
git clone https://gitee.com/yysr_rlw/vvt-lite.git
```

## 项目配置项

-   文件路由
-   布局系统
-   Api 自动引入
-   组件自动引入
-   插件自动加载支持
-   axios 封装请求
-   pinia
-   VueUse 支持
-   Unocss
-   pnpm 包管理器
-   页面跳转进度条
-   tsx 支持
-   路径别名 `~` 支持

## 项目起步

### 1. 安装依赖

```shell
pnpm install
```

### 2. 项目启动

```shell
pnpm dev
```

### 3. 项目打包

```shell
pnpm build
```

## 项目细节

### [1. 文件路由](https://github.com/hannoeru/vite-plugin-pages)

-   `src/pages/index.vue` => `/`（ 默认 index.vue 为路由根目录）
-   `src/pages/users/index.vue` => `/users` （文件夹为上级目录)
-   `src/pages/users/[id].vue` => `/users/:id`（页面 prams 传参)
-   `src/pages/[user]/settings.vue` => `/:user/settings`（动态路由）
-   `src/pages/[...notFound].vue` => 404 路由（无效页面跳转至 404)

<br />

### [2. 布局系统](https://github.com/dishait/vite-plugin-vue-meta-layouts)

-   default.vue

```html
<!-- src/layouts/default.vue -->
<template>
    我是默认布局
    <router-view />
    <!-- 页面视图出口 -->
</template>
```

-   index.vue

```html
<!-- src/pages/index.vue -->
<template>
    <div>我是首页</div>
</template>

<!-- 
    默认（default）时可省略以下内容
    此处的（default）来自于layouts文件夹下的default.vue
    举一反三，若想修改布局，layouts文件下的notFound.vue，将meta：后面改成文件名即可（otFound）
-->
<route lang="yaml"> { meta: { layout: 'default' } } </route>
```

<br />

### [3. Api 自动引入](https://github.com/antfu/unplugin-auto-import)

如 `vue` 的 `api` 需要在页面手动通过 `import`引入，且`api`为按需自动引入。

模板内支持：

1. vue
2. vueuse
3. vue-router

```ts
import { ref, onMounted } from "vue";
const count = ref(0);
onMounted(() => {
    count.value++;
});
```

现在可以直接在页面开发中直接使用，无需录入。

```ts
const count = ref(0);
onMounted(() => {
    count.value++;
});
```

原地址： 👉 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 与

<br />

### [4. 组件自动引入](https://github.com/antfu/unplugin-auto-import)

功能同上可省略文件引入

只要在 `src/components` 下定义的组件都将会按需引入，即 `import` 是不需要的。

```html
<script setup lang="ts">
    // 可省略引入
    import HelloWord from "../components/HelloWord.vue";
</script>

<template>
    <HelloWord />
</template>
```

模板内支持：
👉 [ant design of vue](https://next.antdv.com/docs/vue/introduce-cn/) （模板内置）
[element-plus](https://element-plus.gitee.io/zh-CN/)
...

```shell
# 若不想使用ant design of vue
pnpm uninstall ant-design-vue
```

```typescript
/**
 * plugin/index.ts
 * 删除以下内容
*/
import {
--  AntDesignVueResolver,
    ...
} from 'unplugin-vue-components/resolvers'

Components({
    ...
    resolvers: [
--      AntDesignVueResolver(),
        ...
    ],
}),
```

<br />

### [5. VueUse 支持](https://vueuse.org/)

VueUse 是一个基于 Composition API 的实用函数集合。

```html
<script setup lang="ts">
    // useMouse 被自动按需引入了，不需要import
    const { x, y } = useMouse();
</script>
<template>
    <div>x坐标 {{x}}</div>
    <div>y坐标 {{y}}</div>
</template>
```

原地址： 👉 [VueUse](https://vueuse.org/)

<br />

### [6. axios 支持](https://github.com/axios/axios)

将 axios 进行二次分装，导出 fetchEndpoint 函数

将请求所有放置在~/api/allApi 文件夹下

以 export default 对象的形式抛出接口请求

```typescript
/**
 * @description: 封装请求
 * @param { fetchOptionsDto } options
 * reqUrl : 请求地址
 * data : 请求数据
 * contentType : HTTP内容类型; 默认JSON类型('JSON'|'FORM'|'FORMDATA')
 * type : 请求方式 ; 默认POST('POST'|'GET'|'PUT'|'DELETE')
 * isHaveToken: 是否需要在请求头加token; 默认加token(true)
 */

import { fetchEndpoint } from "~/utils/request";

export default {
    login: (data: object) =>
        fetchEndpoint({
            reqUrl: "/login",
            data,
            contentType: 'JSON',
            type: 'POST',
            isHaveToken: false
        }),
};
```

调用接口方法

index.vue

```html
<script setup lang="ts">
    import http from "~/api";

    http.login({ id: 1 });
</script>
```

<br />

### [7. Unocss 支持](https://github.com/unocss/unocss)

原子化 CSS 是一种 CSS 的架构方式，它倾向于小巧且用途单一的 class，并且会以视觉效果进行命名。

UnoCSS 是一个引擎，而非一款框架，因为它并未提供核心工具类，所有功能可以通过预设和内联配置提供。

实际用法：

直接在 dom 元素的 class 写上表达式

```css
  <div class="bg-blue-200 p-10px text-18px m-15px">Unocss</div>
  <div class="bg-hex-F2F2F2">Unocss</div>
  ...
```

原地址： 👉 [Unocss](https://github.com/unocss/unocss)

<br />

### [8. pinia 支持](https://pinia.vuejs.org/)

就像编写页面时一样，直接导出变量、方法

在页面引入调用即可

甚至可以使用计算属性 computed

```javascript
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
    const name = ref("hellow pinia");
    const newName = computed(() => name.value + "!");
    return {
        name,
        newName,
    };
});
```

```html
<script setup lang="ts">
    import { useUserStore } from "~/store/user";
    const user = useUserStore();
</script>

<template>
    <div class="container">{{user.name}}</div>
    // hellow pinia
    <div class="container">{{user.newName}}</div>
    // hellow pinia!
</template>
```

原地址： 👉 [pinia](https://pinia.vuejs.org/)

<br />
