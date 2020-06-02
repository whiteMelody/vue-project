<template>

  <div class="wb100 hidden">
    <!--<script src="https://s13.cnzz.com/z_stat.php?id=1264319468&web_id=1264319468" language="JavaScript"></script>-->
  </div>

</template>

<script>
    export default{
        props: ['type'],
        data (){
            return {}
        },
        mounted(){
          var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1270010867'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s13.cnzz.com/z_stat.php%3Fid%3D1270010867' type='text/javascript'%3E%3C/script%3E"));
        }
    }
</script>
