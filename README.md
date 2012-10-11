Mobile NAO
==========

A quick start for developing a single page mobile website. Uses [grunt][1] to compile LESS, minify JS, and start a local server to get you started immediately.

Features
--------
Includes
- [Zepto.js](http://zeptojs.com/ "Zepto.js") and [Lodash](http://lodash.com/ "Lodash") for your JS needs
- [LESS Elements](http://lesselements.com/ "LESS Elements") for easy mixins
- Pre-defined media queries for quick access
- Retina ready CSS selectors for high resolution devices


Get started
-----------
<code>
git clone https://github.com/qwertypants/mobile-nao
cd mobile-nao
npm install
</code>

Once all the packages are installed, run the <code>grunt</code> command. This will concatenate and lint your files. It also will start a local server at http://localhost:8000.

Your production ready files are located in the public folder. From here on, all you need to do worry about 3 files:

1. [styles.less][4]
2. [app.js][5]
3. [index.html][6]

Obviously, you can add/edit more files to your liking by customizing your build...


Customizing
-----------
It all starts in your [grunt.js][3] file.
TODO: add content

Fork this repo and add to the awesome. 
##### Based off of [sunrise][2].
  [1]: http://gruntjs.com "gruntjs"
  [2]: https://github.com/sjlu/sunrise "Sunrise"
  [3]: grunt.js
  [4]: assets/less/styles.less
  [5]: assets/js/app.js
  [6]: public/index.html