<template>
  <section class="photo">
    <div class=" row q-gutter-xs q-pa-md">
      <q-file
        v-model="file"
        color="primary"
        filled
        accept=".jpg, image/*"
        label="Dodaj zdjęcie"
        style="max-width: 300px"
        dense
        class="col"
      >
        <template v-slot:prepend>
          <q-icon
            color="primary"
            name="add"
          />
        </template>
      </q-file>
      <q-btn
        padding="xs"
        color="primary"
        icon="save"
        :disable="!loaded"
        dense
        class="col-3"
        @click="saveImage"
      />
    </div>
    <div
      v-show="loaded"
      class="column"
    >
      <canvas
        ref="canvas"
        class="canvas"
        :width="getCanvasWidth"
        :height="getCanvasHeight"
      />
      <div class="slider q-px-md q-pt-md q-pb-xs row justify-center items-center">
        <span class="col-shrink q-mr-xs">Obrót</span>
        <q-slider
          v-model="rotation"
          :min="-22.5"
          :max="22.5"
          :step="0.5"
          color="indigo-10"
          class="col"
        />
      </div>
      <div class="slider q-px-md q-pt-xs row justify-center items-center">
        <span class="col-shrink q-mr-xs">Zoom</span>
        <q-slider
          v-model="scaling"
          :min="-100"
          :max="100"
          :step="1"
          color="indigo-10"
          class="col"
        />
      </div>
    </div>
  </section>
</template>
<script>
/* eslint-disable no-console */
import { dataURLtoFile } from '../../helpers/imageBase64ToFile'

export default {
  props: {
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
  },
  data() {
    return {
      canvasState: {
        width: this.width,
        height: this.height,
        canvas: null,
        ctx: null,
        image: {
          width: 0,
          height: 0,
        }
      },
      imageState: {
        x: 0,
        y: 0,
        image: null,
        scaling: 0,
      },
      rotation: 0,
      scaling: 0,
      file: null,
      loaded: false,
    };
  },
  computed: {
    getCanvasWidth() { return this.width; },
    getCanvasHeight() { return this.height },
  },
  watch: {
      rotation() {this.rotateImage()},
      scaling() {this.scaleImage()},
      file() {this.uploadImage()}
  },

  mounted() {
    const canvas = this.$refs["canvas"];
    canvas.width = this.canvasState.width;
    canvas.height = this.canvasState.height;
    this.canvasState.canvas  = canvas
    this.canvasState.ctx =  canvas.getContext("2d");
  },
  methods: {
    setLoading(state) {
      this.loaded = state;
    },

    saveImage() {
      if (this.canvasState.image.width < this.canvasState.width || this.canvasState.image.height < this.canvasState.height)
        return this.$notifyAlert('Dopasuj poprawnie obraz!', 'error')
      const base64Image = this.canvasState.canvas.toDataURL('image/jpg');
      const imgFile = dataURLtoFile(base64Image, this.file.name);
      this.$emit('saved-image', imgFile)
    },

    paintCanvasBg() {
      this.canvasState.ctx.fillStyle = "rgba(255,255,255,1)";
      this.canvasState.ctx.fillRect(0, 0, this.canvasState.width, this.canvasState.height);
    },

    rotateImage() {
      this.paintCanvasBg();
      this.canvasState.ctx.save();
      const scale =  this.scaling;
      const imageWidth = scale !== 0 ? this.imageState.width  + (( this.imageState.width / 100 ) * scale ) : this.imageState.width;
      const imageHeight = scale !== 0 ? this.imageState.height  + (( this.imageState.height / 100 ) * scale ) : this.imageState.height;
      const canvasHalfWidth = this.canvasState.width / 2;
      const canvasHalfHeight = this.canvasState.height / 2;
      const calcRotation = (Math.PI / 180) * this.rotation;
      const calcX = this.canvasState.width / 2 - imageWidth / 2;
      const calcY = this.canvasState.height / 2 - imageHeight / 2;

      this.canvasState.ctx.translate(canvasHalfWidth, canvasHalfHeight);
      this.canvasState.ctx.rotate(calcRotation);
      this.canvasState.ctx.translate(-canvasHalfWidth, -canvasHalfHeight);
      this.imageState.x = calcX;
      this.imageState.y = calcY;
      this.redraw(imageWidth, imageHeight);
      this.canvasState.ctx.restore();
    },

    scaleImage() {
      this.paintCanvasBg()
      this.canvasState.ctx.save();
      const scale =  this.scaling;
      const canvasHalfWidth = this.canvasState.width / 2;
      const canvasHalfHeight = this.canvasState.height / 2;
      const calcX = canvasHalfWidth - (( this.imageState.width  + (( this.imageState.width / 100 ) * scale ) ) / 2 );
      const calcY = canvasHalfHeight - (( this.imageState.height  + (( this.imageState.height / 100 ) * scale ) ) / 2 );
      const scaledWidth = this.imageState.width  + (( this.imageState.width / 100 ) * scale );
      const scaledHeight = this.imageState.height  + (( this.imageState.height / 100 ) * scale );
      if (this.rotation !== 0) {
        const calcRotation = (Math.PI / 180) * this.rotation;
        this.canvasState.ctx.translate(canvasHalfWidth, canvasHalfHeight);
        this.canvasState.ctx.rotate(calcRotation);
        this.canvasState.ctx.translate(-canvasHalfWidth, -canvasHalfHeight);
      }

      this.imageState.x = calcX;
      this.imageState.y = calcY;
      this.redraw(scaledWidth, scaledHeight);
      this.canvasState.ctx.restore();
    },

    scaleToFit() {
      this.paintCanvasBg()
      const scale =  Math.min(this.canvasState.width / this.imageState.width, this.canvasState.height / this.imageState.height);
      const calcX = this.canvasState.width / 2 - ( this.imageState.width / 2 ) * scale;
      const calcY = this.canvasState.height / 2 - ( this.imageState.height / 2 ) * scale;
      const scaledWidth = this.imageState.width * scale;
      const scaledHeight = this.imageState.height * scale;
      this.canvasState.ctx.save()
      this.imageState.x = calcX;
      this.imageState.y = calcY;
      this.imageState.width = scaledWidth;
      this.imageState.height = scaledHeight;
    },

    redraw(imgWidth, imgHeight) {
      this.canvasState.image.width = imgWidth;
      this.canvasState.image.height = imgHeight;
      this.canvasState.ctx.drawImage(this.imageState.image, this.imageState.x, this.imageState.y, imgWidth, imgHeight);
    },

    draw() {
      this.scaleToFit();
      this.canvasState.image.width = this.imageState.width;
      this.canvasState.image.height = this.imageState.height;
      this.canvasState.ctx.drawImage(this.imageState.image, this.imageState.x, this.imageState.y, this.imageState.width, this.imageState.height)
      this.setLoading(true);
    },

    loadToCanvas(url) {
      const imageObj = new Image();
      imageObj.src = url;
      imageObj.onload = () => {
        this.imageState.image = imageObj;
        this.imageState.width = imageObj.width;
        this.imageState.height = imageObj.height;
        this.draw();
      }
    },

    async uploadImage() {
      this.loaded = false;
      const reader = new FileReader();
      this.loadedImage = await this.file;
      reader.onload = e => this.loadToCanvas(e.target.result);
      reader.readAsDataURL(this.loadedImage);
    }
  }
};
</script>

<style lang="scss" scoped>
.photo {
  width: 100%;
  max-width: max-content;
  min-width: 300px;
}
.slider {
  max-width: 300px;
  color: $indigo-10;

  & span {
    display: block;
  }
}
.canvas {
  width: max-content;
  margin: 0 auto;
  border: 5px solid rgba(66,66,66,.8);
}
</style>
