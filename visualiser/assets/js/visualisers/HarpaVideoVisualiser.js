(function(global) {
    /*

        Example simple Visualiser class

    */

    var HarpaTestVisualiser = function() {
        // stores the current volume
        this.currentVolume = 0;

        // stores the current beat envelope / value
        this.currentBeatValue = 0;

        this.player = document.getElementById('player');
    };

    var p = (HarpaTestVisualiser.prototype = new HarpaVisualiserBase());

    p.render = function() {
        if (this.player.paused || this.player.ended) return false;

        this.combCtx.drawImage(this.player, 0, 0, this.totalWidth, this.totalHeight);
        this.drawToFaces(this.combinedCanvas);

        // See HarpaTestVisualiser.js for example of using beat and volume information
    };

    global.HarpaTestVisualiser = (global.module || {}).exports = HarpaTestVisualiser;
})(this);
