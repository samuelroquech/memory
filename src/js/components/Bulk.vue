<template>
  <div>
    <h1 class="justify-center text-4xl my-5 text-center">{{ title }}</h1>
    <div class="w-full flex justify-center">
      <div class="w-1/2">
        <div class="flex w-full h-screen items-start justify-center bg-grey-lighter">
          <label
            class="w-64 m-5 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer"
          >
            <svg
              class="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
              />
            </svg>
            <span class="mt-2 text-base leading-normal">Importar CSV</span>
            <input type="file" class="hidden" v-on:change="importFile" />
          </label>
          <label
            class="w-64 m-5 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer"
          >
            <svg
              class="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
              />
            </svg>
            <span class="mt-2 text-base leading-normal">Descargar</span>
            <input type="button" class="hidden" v-on:click="exportFile" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "bulk",
  props: ["items"],
  components: {},
  data() {
    return {
      title: "Bulk Editor",
      xml: ""
    };
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    importFile: function(e) {
      let f = e.target.files[0];
      let t = this;
      if (f) {
        var r = new FileReader();
        r.onload = function(e) {
          var contents = e.target.result;
          var lines = t.CSVToArray(contents);
          t.$parent.clearItems();

          for (var i = 0; i < lines.length; i++) {
            let item = lines[i];

            let tags = [];
            let text = item[item.length - 1];
            item.forEach((element, i) => {
              if (i != item.length - 1) {
                tags.push({
                  text: element,
                  tiClasses: ["ti-valid"]
                });
              }
            });

            t.$parent.addItem({
              tags: tags,
              text: text
            });
          }
        };
        r.readAsText(f);
      } else {
        alert("Failed to load file");
      }
    },
    CSVToArray(strData, strDelimiter) {
      strDelimiter = strDelimiter || ",";

      var objPattern = new RegExp(
        "(\\" +
          strDelimiter +
          "|\\r?\\n|\\r|^)" +
          '(?:"([^"]*(?:""[^"]*)*)"|' +
          '([^"\\' +
          strDelimiter +
          "\\r\\n]*))",
        "gi"
      );
      var arrData = [[]];
      var arrMatches = null;
      while ((arrMatches = objPattern.exec(strData))) {
        var strMatchedDelimiter = arrMatches[1];
        if (
          strMatchedDelimiter.length &&
          strMatchedDelimiter !== strDelimiter
        ) {
          arrData.push([]);
        }
        var strMatchedValue;
        if (arrMatches[2]) {
          strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
        } else {
          strMatchedValue = arrMatches[3];
        }
        arrData[arrData.length - 1].push(strMatchedValue);
      }
      return arrData;
    },
    exportFile: function() {
      this.ArrayToCsv();
    },
    ArrayToCsv(strDelimiter) {
      strDelimiter = strDelimiter || ",";
      let finalArray = [];
      this.$parent.items.forEach(element => {
        let array = _.map(element.tags, "text");
        array.push(element.text);
        finalArray.push(array);
      });
      if (finalArray.length) {
        this.exportToCsv("file.csv", finalArray);
      }
    },
    exportToCsv(filename, rows) {
      var processRow = function(row) {
        var finalVal = "";
        for (var j = 0; j < row.length; j++) {
          var innerValue = row[j] === null ? "" : row[j].toString();
          if (row[j] instanceof Date) {
            innerValue = row[j].toLocaleString();
          }
          var result = innerValue.replace(/"/g, '""');
          if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
          if (j > 0) finalVal += ",";
          finalVal += result;
        }
        return finalVal + "\n";
      };

      var csvFile = "";
      for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
      }

      var blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, filename);
      } else {
        var link = document.createElement("a");
        if (link.download !== undefined) {
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    }
  }
};
</script>
