0X00 品牌资产包
================

怎么看
  解压后双击 index.html，用 Chrome / Edge / Safari 打开。
  开场先选“硬核版”或“艺术版”，再一步步往下看；左右方向键翻页，Esc 回到开头。

文件在哪
  dist/            硬核版（点阵 + 红色终止符）
    svg/           矢量 logo：横版、长版、方形、终止符小图标、横幅、壁纸
    png/           位图：各版 logo、网站图标、头像、横幅、壁纸、视频角标
    loaders/       加载动画（SVG，直接当图片用就会动）
    video/         开场动画 MP4（4K / 方形 / 竖版）
    gif/           动图
  dist/art/        艺术版（黑白，0X00 和 /0// 之间变形）
    svg/  png/     字标两种状态、∅ 标志、竖排组合、长版、头像
    video/  gif/   字标动画（4K 60fps）、组合动画、标志动画

  一共 106 个文件：硬核版 55 个，艺术版 51 个。

字体
  艺术版字形来自 Major Mono Display，SIL Open Font License 1.1，可以用在 logo 里。
  许可证在 fonts/OFL.txt，转发字体文件时请连同许可证一起。
