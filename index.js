const fs = require('fs');
const path = require('path');

module.exports = function NovaWatcher(context, component_path = null)
{
    this.mix = context;
    this.path = path.resolve(process.cwd(), (component_path || './nova-components'));

    this.components = fs.readdirSync(this.path);

    this.getType = function (path)
    {
        if (fs.existsSync(path + 'js/field.js')) {
            return 'field'
        }

        if (fs.existsSync(path + 'js/tool.js')) {
            return 'tool'
        }

        if (fs.existsSync(path + 'js/asset.js')) {
            return 'asset'
        }

        return '';
    };

    this.queueComponent = function (component)
    {
        const path = `${this.path}/${component}/resources/`;

        this
            .mix
            .js(path + `/js/${this.getType(path)}.js`, path + 'dist/js')
            .sass(path + `/sass/${this.getType(path)}.scss`, path + 'dist/css')
            .webpackConfig({
                resolve: {
                    symlinks: false
                }
            });
    };

    this.components.forEach(c => this.queueComponent(c));
};

