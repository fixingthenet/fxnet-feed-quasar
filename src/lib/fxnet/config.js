class Config {
    constructor(config) {
        if (config) {

        } else {
            config={}
            document.querySelectorAll('meta').forEach((meta) => {
                if (meta.hasAttribute('name') && meta.hasAttribute('content')) {
                    const { attributes } = meta;
                    if (attributes.json) {
                        config[attributes.name.value] = JSON.parse(attributes.content.value);
                    } else {
                        config[attributes.name.value] = attributes.content.value;
                    }
                }
            });


        }
        this.config=config

    }
}


export default new Config();
