"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        eslint: {
            src: [
                "Gruntfile.js",
                "app/**/*.js"
            ]
        }

    });

    grunt.loadNpmTasks("grunt-eslint");

    grunt.registerTask("default", [
        "eslint"
    ]);
};
