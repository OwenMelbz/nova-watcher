const fs = require('fs');
const path = require('path');

module.exports = function NovaWatcher(context, component_path = null)
{
    this.mix = context;
    this.path = path.resolve(process.cwd(), (component_path || './nova-components'));

    this.components = fs.readdirSync(this.path);

    this.queueComponent = function (component)
    {
        const path = `${this.path}/${component}/resources/`;

        this
            .mix
            .js(path + '/js/field.js', path + 'dist/js')
            .sass(path + '/sass/field.scss', path + 'dist/css')
            .webpackConfig({
                resolve: {
                    symlinks: false
                }
            });
    };

    this.components.forEach(c => this.queueComponent(c));
};

