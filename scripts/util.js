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


var Util = function()
{
    // Determine how many characters in the beginning of string a
    // are common with that of string b.
    //
    // Arguments:
    //   a -- A string
    //   b -- Another string
    //
    // Return:
    //   The number of common characters in the beginning of both
    //   strings
    function common(a, b)
    {
        var minLength = Math.min(a.length, b.length)
        for (var i = 0; i < minLength; i++) {
            if (a.charAt(i) != b.charAt(i)) {
                return i
            }
        }
        return i
    }


    // Return a random element from the specified a.
    //
    // Argument:
    //   a -- An array
    //
    // Return:
    //   An element selected randomly from the array a
    function random(a, b)
    {
        if (typeof a == 'number') {
            if (typeof b == 'number') {
                a = Math.floor(a)
                b = Math.floor(b)
                return Math.floor(Math.random() * (b - a + 1)) + a
            } else {
                return Number.NaN
            }
        } else if (a instanceof Array) {
            return a[Math.floor(Math.random() * a.length)]
        }
    }


    // Convert the specified duration specified as the number of
    // milliseconds into a string that specifies the duration in days,
    // hours, minutes and seconds.
    //
    // Argument:
    //   milliseconds -- Duration specified as number of milliseconds
    //                   (type: number)
    //
    // Return:
    //   Duration specified in days, hours, minutes and seconds
    //   (type: string)
    function prettyTime(milliseconds, showMilliseconds)
    {
        if (typeof showMilliseconds == 'undefined') {
            showMilliseconds = true
        }

        seconds = Math.floor(milliseconds / 1000)
        minutes = Math.floor(seconds / 60)
        hours = Math.floor(minutes / 60)
        days = Math.floor(hours / 24)


        milliseconds %= 1000
        seconds %= 60
        minutes %= 60
        hours %= 24

        seconds += (milliseconds / 1000)

        var s = ''

        if (days != 0) {
            s += days + ' day' + (days > 1 ? 's' : '') + ' '
        }

        if (hours != 0) {
            s += hours + ' hour' + (hours > 1 ? 's' : '') + ' '
        }

        if (minutes != 0) {
            s += minutes + ' minute' + (minutes > 1 ? 's' : '') + ' '
        }

        if (seconds != 0) {
            s += seconds.toFixed(showMilliseconds ? 3 : 0) +
                 ' second' + (seconds > 1 ? 's' : '') + ' '
        }

        if (s.length == 0) {
            return '0 second'
        } else {
            // Remove the trailing space and return the string
            return s.substring(0, s.length - 1)
        }
    }

    // Util object
    return {
        common: common,
        random: random,
        prettyTime: prettyTime
    }
}()
