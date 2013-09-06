define(function () {
    function AssetManager() {
        this.assets = {};
        this.callbacks = {};
    }

    AssetManager.prototype.assets = {};

    /**
     * If assets is loaded then function will immediatelly call onsuccess callback
     * If assets is not loaded it will start loading it
     * If assets is not loaded but is already loading, then given callback will be called once loading finishes.
     * @param {string} name asset's filename including path
     * @param {function} onsuccess
     * @param {function} onprogress
     */
    AssetManager.prototype.getAsset = function (name, onsuccess, onprogress) {
        if (this.assets[name] !== undefined) {
            if (this.assets[name] !== "loading") {
                onsuccess(this.assets[name]);
            } else {
                this.callbacks[name].push({
                    onsuccess: onsuccess,
                    onprogress: onprogress
                });
            }
        } else {
            this.assets[name] = "loading";
            this.callbacks[name] = [
                {
                    onsuccess: onsuccess,
                    onprogress: onprogress
                }
            ];
            var assetManager = this;
            this.loadAsset(name, function (obj) {
                for (var i = 0; i < assetManager.callbacks[name].length; i++) {
                    if (assetManager.callbacks[name][i].onsuccess)
                        assetManager.callbacks[name][i].onsuccess(obj);
                }
            }, function (e) {
                for (var i = 0; i < assetManager.callbacks[name].length; i++) {
                    if (assetManager.callbacks[name][i].onprogress)
                        assetManager.callbacks[name][i].onprogress(e);
                }
            });
        }
    };

    AssetManager.prototype.releaseAsset = function (name) {
        if (this.assets[name] !== undefined)
            delete this.assets[name];
    }

    AssetManager.prototype.loadAsset = function (name, onsuccess, onprogress) {
        var assetManager = this,
            xhr = new XMLHttpRequest();

        xhr.open("GET", name, true);
        xhr.responseType = "blob";

        if (onprogress) xhr.addEventListener('progress', onprogress);

        xhr.addEventListener('load', function (e) {
            var blob = xhr.response,
                type = blob.type.split('/')[0];

            if (type === 'image') {
                var img = assetManager.assets[name] = new Image();
                img.addEventListener('load', function () {
                    onsuccess(img);
                });
                img.src = URL.createObjectURL(blob);
                return;
            } else if (type === 'audio') {
                var audio = assetManager.assets[name] = new Audio();
                audio.addEventListener('load', function () {
                    onsuccess(audio);
                });
                audio.src = URL.createObjectURL(blob);
                return;
            } else {
                onsuccess(assetManager.assets[name] = blob);
                return;
            }
        });

        xhr.send();

        return xhr;
    };

    AssetManager.prototype.loadBatch = function (batch, onsuccess, onprogress) {
        var overallProgress = 0,
            loadedAssets = [],
            batchLength = batch.length,
            i, name;

        for (var i = 0; i < batchLength; i++) {
            name = batch[i];
            this.loadAsset(
                name,
                function (asset) {
                    loadedAssets.push(asset);
                    if (loadedAssets.length === batchLength) {
                        onsuccess(loadedAssets);
                    }
                },
                function (progress) {
                    var xhr = progress.target,
                        np = progress.loaded / progress.total;

                    overallProgress += (np - (xhr.progress || 0)) / batchLength;
                    xhr.progress = np;

                    onprogress(overallProgress);
                });
        }
    }

    return new AssetManager();
});
