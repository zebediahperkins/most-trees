<h1>most-trees</h1>
<p>A small javascript library that allows you to implement most tree data structures</p>
<h2>Features</h2>
<ul></ul>
<h2>Usage</h2>
<p>Install most-trees using npm:</p>
<pre>
    <code>> npm install most-trees</code>
</pre>
<p>Next, require the package, and use the assets you need:</p>
<pre>
    <code>const mostTrees = require('most-trees');

const ExpressionTree = mostTrees.ExpressionTree;

let expTree = new ExpressionTree('3x*(2x+2)-83');
console.log(expTree.solveTree()); //logs 6x(x+1)-83</code>
</pre>
<h2>Documentation</h2>
<ul></ul>
<h2>Testing</h2>
<p>To run testing for this library, install the dev-dependencies with:</p>
<pre>
    <code>> npm install</code>
</pre>
<p>Then, execute the tests:</p>
<pre>
    <code>> npm test</code>
</pre>
<h2>License</h2>
<p>MIT License</p><br>
<p>Copyright (c) 2020 Zebediah Perkins</p><br>
<p>Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:</p><br>
<p>The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.</p><br>
<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.</p>
