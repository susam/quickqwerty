/*
SIMPLIFIED BSD LICENSE

Copyright (c) 2013 Susam Pal
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:
    1. Redistributions of source code must retain the above copyright
       notice, this list of conditions and the following disclaimer.
    2. Redistributions in binary form must reproduce the above
       copyright notice, this list of conditions and the following
       disclaimer in the documentation and/or other materials provided
       with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var unitLinksDiv    // To display all unit numbers
var subunitLinksDiv // To display all subunits in a unit


window.onload = init


// Initialize the typing tutor
function init()
{
    unitLinksDiv = document.getElementById('unitLinks')
    subunitLinksDiv = document.getElementById('subunitLinks')
    initUnitLinks()
    initSubunitLinks(1)
}


// Initialize the unit links
function initUnitLinks()
{
    for (var i = 0; i < units.length; i++) {
        var divElement = document.createElement('div')
        divElement.className = 'unselected'
        divElement.id = 'unit' + (i + 1)

        var anchorElement = document.createElement('a')
        anchorElement.href = "#" + (i + 1)
        anchorElement.innerHTML = 'Unit ' + (i + 1)

        divElement.appendChild(anchorElement)
        unitLinksDiv.appendChild(divElement)
    }
}


// Initialize the subunit links
//
// Arguments:
//   m -- Unit number
function initSubunitLinks(m)
{
    // Get the subunit names
    var subunit = units[m - 1].subunits
    var subunitNames = []
    for (name in subunit) {
        subunitNames.push(name)
    }

    // Delete all existing subunit links
    while (subunitLinksDiv.firstChild &&
           subunitLinksDiv.firstChild.className != 'stretch') {
        subunitLinksDiv.removeChild(subunitLinksDiv.firstChild)
    }

    // Create new subunit links for the unit m
    for (var i = subunitNames.length - 1; i >= 0; i--) {
        var whitespace = document.createTextNode('\n')
        subunitLinksDiv.insertBefore(whitespace, subunitLinksDiv.firstChild)

        var div = document.createElement('div')
        div.className = 'unselected'
        div.id = 'subunit' + (i + 1)
        div.style.width = (95 / subunitNames.length) + '%'

        var anchor = document.createElement('a')
        anchor.href = '#' + m + '.' + (i + 1)
        anchor.innerHTML = subunitNames[i]

        div.appendChild(anchor)
        subunitLinksDiv.insertBefore(div, subunitLinksDiv.firstChild)
    }
}
