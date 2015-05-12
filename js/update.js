/*
SIMPLIFIED BSD LICENSE

Copyright (c) 2008-2015 Susam Pal
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

  1. Redistributions of source code must retain the above copyright
     notice, this list of conditions and the following disclaimer.
  2. Redistributions in binary form must reproduce the above copyright
     notice, this list of conditions and the following disclaimer in
     the documentation and/or other materials provided with the
     distribution.

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


var Update = function() {

    'use strict'


    // Latest stable version
    var STABLE_VERSION = '1.0.0'


    // Download URL for the stable version
    var DOWNLOAD_URL = 'https://github.com/susam/quickqwerty/archive/' +
                        STABLE_VERSION + '.zip'


    // Split a part of the version string into separate tokens of
    // numbers and strings. An array of numbers and strings is returned.
    // Each number is an integer. Each string contains letters from the
    // English alphabet only.
    //
    // If the version cannot be parsed successfully, then null is
    // returned.
    //
    // Examples:
    //   parseVersionTokens('1.2.3') returns [1, 2, 3]
    //   parseVersionTokens('alpha1b107') returns ['alpha', 1, 'b', 107]
    //   parseVersionTokens('alpha1.0') returns ['alpha', 1, 0]
    //   parseVersionTokens('') returns null
    //   parseVersionTokens('#$^') returns null
    //   parseVersionTokens('1#$^0.1') returns [1, 0, 1]
    //
    // Arguments:
    //   vp -- Part of a version string
    //
    // Return:
    //   Parsed tokens of the version string as an array;
    //   null if the version string could not be parsed
    function parseVersionTokens(vp)
    {
        var tokens = vp.match(/\d+|[a-zA-Z]+/g)
        if (tokens == null) {
            return null
        }

        var i

        for (i = 0; i < tokens.length; i++) {
            var n = parseInt(tokens[i])
            if (!isNaN(n)) {
                tokens[i] = n
            }
        }

        return tokens
    }


    // Parse a version string and create an object with two properties:
    //   1. main
    //   2. pre
    //
    // The main property contains the parsed tokens contained in the
    // version string from the beginning of the string to the character
    // just before the first occurrence of '-' or '+' character or to
    // the end of the string if there is no second occurrence of '-' or
    // '+' character.
    //
    // The pre property contains the parsed tokens contained in the
    // version string from the character after the first occurrence of
    // '-' or '+' character to the character just before the second
    // occurrence of '-' or '+' character, or the end of the string if
    // there is no second occurrence of '-' or '+' character.
    //
    // A token of the version string is defined as either an integer or a
    // continuous sequence of letters from the English alphabet. For
    // example, in the version string '1.0-beta1', there are four tokens:
    // 1, 0, 'beta', 1. Of these four tokens [1, 0] form the main
    // property and ['beta', 1] form the pre property.
    //
    // If no data is found for any property, the value of the property
    // is null; otherwise the value of the property is an array of
    // parsed tokens of the version string.
    //
    // The main property usually represents the version number of a
    // product. The pre property usually represents a pre-release
    // identifier of a pre-release.
    //
    // Examples:
    //   parseVersion('') returns {main: null, pre: null}
    //   parseVersion('1') returns {main: [1], pre: null}
    //   parseVersion('1.0') returns {main: [1, 0], pre: null}
    //   parseVersion('1.0.1-') returns {main: [1, 0, 1], pre: null}
    //   parseVersion('1.0-beta1') returns {main: [1, 0], pre: ['beta', 1]}
    //   parseVersion('1.0-b2+101') returns {main: [1, 0], pre: ['b', 2]}
    //
    // Arguments:
    //   v -- Version string
    //
    // Return:
    //   Parsed version object
    function parseVersion(v)
    {
        var version = {
            main: null,
            pre: null
        }

        var parts = v.split(/-|\+/, 2)

        if (parts.length >= 1) {
            version.main = parseVersionTokens(parts[0])
        }

        if (parts.length >= 2) {
            version.pre = parseVersionTokens(parts[1])
        }

        return version
    }


    // Make the lengths of the specified version parts equal by padding
    // the shorter version part with zeroes. Each version part is an
    // array of tokens. Pad the version part with less tokens with 0's
    // such that both version parts have an equal number of tokens.
    //
    // Arguments:
    //   a -- A version part represented as an array of tokens
    //   b -- Another version part represented as an array of tokens
    function normalizeVersionParts(a, b)
    {
        var i

        if (a.length < b.length) {
            for (i = 0; i < b.length - a.length; i++) {
                a.push(0)
            }
        } else {
            for (i = 0; i < a.length - b.length; i++) {
                b.push(0)
            }
        }
    }


    // Compare two version tokens.
    //
    // A version token is either of type number or of type string. If
    // the version tokens are not of the same type, then the token of
    // number type is considered smaller than the token of string type.
    // If both version tokens are of the same type, then they are
    // compared numerically or lexically.
    //
    // Examples:
    //   compareVersionTokens('alpha', 1) returns 1
    //   compareVersionTokens(1, 'alpha') returns -1
    //   compareVersionTokens(1, 2) returns -1
    //   compareVersionTokens(2, 1) returns 1
    //   compareVersionTokens(2, 2) returns 0
    //   compareVersionTokens('alpha', 'beta') returns -1
    //   compareVersionTokens('beta', 'alpha') returns 1
    //   compareVersionTokens('beta', 'beta') returns 0
    //
    // Arguments:
    //   a -- A version token
    //   b -- Another version token
    //
    // Return:
    //   1 if a > b
    //   0 if a = b
    //  -1 if a < b
    function compareVersionTokens(a, b)
    {
        if (typeof a == 'number' && typeof b == 'string') {
            return -1
        } else if (typeof a == 'string' && typeof b == 'number') {
            return 1
        } else if (a < b) {
            return -1
        } else if (a > b) {
            return 1
        } else {
            return 0
        }
    }


    // Compare two version parts where each version part is represented
    // as an array of tokens. The result of the comparison is determined
    // by the first difference when comparing the tokens in each part
    // from left to right. If both parts have an unequal number of
    // tokens, the missing parts in the shorter part are assumed to be
    // 0's.
    //
    // Examples:
    //   compareVersionParts([1], [1]) returns 0
    //   compareVersionParts([1, 0], [1]) returns 0
    //   compareVersionParts([1], [1, 0]) returns 0
    //   compareVersionParts([1, 1], [1, 1, 0, 0]) returns 0
    //   compareVersionParts([1, 1], [1, 2, 0, 0]) returns -1
    //   compareVersionParts([1, 2], [1, 1]) returns 1
    //   compareVersionParts(['alpha'], ['alpha']) returns 0
    //   compareVersionParts(['alpha', 0], ['alpha']) returns 0
    //   compareVersionParts(['alpha'], ['alpha', 1]) returns -1
    //   compareVersionParts(['rc', 'A'], ['rc']) returns 1
    //   compareVersionParts(['rc', 'A'], ['rc', 1]) returns 1
    function compareVersionParts(a, b)
    {
        if (a.length != b.length) {
            normalizeVersionParts(a, b)
        }

        var i
        var result
        for (i = 0; i < a.length; i++) {
            result = compareVersionTokens(a[i], b[i])
            if (result != 0) {
                return result
            }
        }

        return 0
    }


    // Compare two version strings. First the main parts of both
    // versions are compared. If they turn out to be equal, then the
    // pre-release parts of both versions are compared.
    //
    // Examples:
    //   compareVersions('1', '1.0') returns 0
    //   compareVersions('1.0-beta', '1.0') returns -1
    //   compareVersions('1.0', '1-beta') returns 1
    //   compareVersions('1.0.0', '1.0.Jan') returns -1
    //   compareVersions('1-b+101', '1.0-b+102') returns 0
    //   compareVersions('1-b10', '1.0-b11') returns -1
    //   compareVersions('1-b11jan', '1.0-b10jan') returns 1
    //   compareVersions('1-b10x', '1.0-b10') returns 1
    //
    // Return:
    //   1 if version a > version b
    //   0 if version a = version b
    //  -1 if version a < version b
    function compareVersions(a, b)
    {
        var pa = parseVersion(a)
        var pb = parseVersion(b)

        // Null checks
        if (pa.main == null && pb.main == null) {
            return 0
        } else if (pa.main == null) {
            return -1
        } else if (pb.main == null) {
            return 1
        }

        // Compare main version strings
        var result = compareVersionParts(pa.main, pb.main)
        if (result != 0) {
            return result
        }

        // Since main version strings are equal, compare pre-release
        // strings. First perform null checks.
        if (pa.pre == null && pb.pre == null) {
            return 0
        } else if (pa.pre == null) {
            return 1
        } else if (pb.pre == null) {
            return -1
        }

        // Compare pre-release version strings
        return compareVersionParts(pa.pre, pb.pre)
    }


    // Check if there is a version update required. If a stable version
    // is available that is newer than the version of the application
    // the user is using, then display a message with the details about
    // the version update and allow the user to update or ignore the
    // update.
    //
    // The update message is displayed to the user only when a new
    // session begins until the user hides the message. If the user
    // hides the message, then the update message is not visible anymore
    // till the end of the session, and it is visible again from the
    // beginning of the next new session.
    function check()
    {
        if (typeof sessionStorage.update != 'undefined' &&
            sessionStorage.update == 'no') {
            return
        }

        // If the Tutor.VERSION string is not available, it is not
        // possible to compare whether the latest stable version is
        // greater than it or not.
        if (typeof Version != 'object' ||
            typeof Tutor.VERSION != 'string') {
            return
        }

        // If the latest stable version is not greater than the version
        // of this application, then no update is required.
        if (compareVersions(STABLE_VERSION, Tutor.VERSION) <= 0) {
            return
        }

        var updateDiv = document.getElementById('update')
        updateDiv.style.display = 'inline-block'

        var thisVersionSpan = document.getElementById('thisVersion')
        thisVersion.innerHTML = Tutor.VERSION

        var stableVersionSpan = document.getElementById('stableVersion')
        stableVersion.innerHTML = STABLE_VERSION

        var downloadLink = document.getElementById('downloadUpdate')
        downloadLink.innerHTML = 'Download QuickQWERTY ' + STABLE_VERSION
        downloadLink.href = DOWNLOAD_URL

        var ignoreLink = document.getElementById('ignoreUpdate')
        ignoreLink.onclick = function()
        {
            updateDiv.style.display = 'none'
            sessionStorage.update = 'no' 
        }
    }


    // Update object
    return {
        check: check
    }
}()
