(function (global) {
    var AlbumsViewModel;
    var app = global.app = global.app || {};
    var storage = window.localStorage;

    AlbumsViewModel = kendo.data.ObservableObject.extend({
        albumsDataSource: null,
        username: null,
        album: null,

        init: function () {
            var that = this;
            var dataSource;

            kendo.data.ObservableObject.fn.init.apply(that, []);
            dataSource = new kendo.data.DataSource({
                data: []
            });

            that.set("albumsDataSource", dataSource);
        },

        viewShow: function (newAlbum) {
            var that = this;
            var dataSource;
            var data;
            var newUsername = storage.getItem("username");

            if (newAlbum && newAlbum !== that.album) {
                that.album = newAlbum;
                var albumToAdd = JSON.parse(newAlbum);
                var currentAlbums = JSON.parse(storage.getItem("albums"));
                currentAlbums.push(albumToAdd);
                storage.setItem("albums", JSON.stringify(currentAlbums));
                dataSource = new kendo.data.DataSource({
                    data: currentAlbums
                });

                that.set("albumsDataSource", dataSource);
            } else if (newUsername !== that.username) {
                data = storage.getItem("albums");
                if (data !== "null") {
                    data = JSON.parse(storage.getItem("albums"));
                } else {
                    data = [];
                }

                that.username = newUsername;

                dataSource = new kendo.data.DataSource({
                    data: data
                });

                that.set("albumsDataSource", dataSource);
            }
        },

        onAddNewAlbum: function () {
            app.application.navigate("views/select-location.html");
        },

        onAddExistingAlbum: function () {
            app.application.navigate("views/add-existing-album.html");
        }
    });

    app.albumsService = {
        viewModel: new AlbumsViewModel(),
        show: function (e) {
            app.albumsService.viewModel.viewShow(e.view.params.newAlbum);
        }
    };
})(window);
