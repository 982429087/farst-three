---
title: Scene
lang: zh-CN
---

# Scene

第一个中文文档

## 基础用法

默认情况下，词缀固定在页面的顶部。

:::demo 你可以设置`offset`属性来改变偏移顶部，默认值为0。

scene/basic

:::


## Affix API

### Affix Attributes

| Name       | Description                      | Type                       | Default | Required |
| ---------- | -------------------------------- | -------------------------- | ------- | -------- |
| `offset`   | offset distance.                 | ^[number]                  | `0`     | No       |
| `position` | position of affix.               | ^[enum]`'top' \| 'bottom'` | `'top'` | No       |
| `target`   | target container. (CSS selector) | ^[string]                  | —       | No       |
| `z-index`  | `z-index` of affix               | ^[number]                  | `100`   | No       |

### Affix Events

| Name     | Description                        | Type                                                                |
| -------- | ---------------------------------- | ------------------------------------------------------------------- |
| `change` | triggers when fixed state changed. | ^[Function]`(fixed: boolean) => void`                               |
| `scroll` | triggers when scrolling.           | ^[Function]`(value: { scrollTop: number, fixed: boolean }) => void` |

### Affix Exposes

| Method       | Description                 | Type                    |
| ------------ | --------------------------- | ----------------------- |
| `update`     | update affix state manually | ^[Function]`() => void` |
| `updateRoot` | update rootRect info        | ^[Function]`() => void` |

### Affix Slots

| Name      | Description                |
| --------- | -------------------------- |
| `default` | customize default content. |
