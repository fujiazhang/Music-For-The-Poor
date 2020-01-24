<template>
    <div>
        <div class="m-input" >
            <div class="inputcover">
                <i class="u-svg u-svg-srch"></i>
                <input type="search" name="search" class="input" placeholder="" autocomplete="off" value="">
                <label class="holder">搜索歌曲如：周杰伦/晴天</label>
                <figure class="close"><i class="u-svg u-svg-empty"></i></figure>
            </div>
        </div>
    </div>
</template>
<script>

export default {

}
</script>
<style lang="stylus" scoped>
    //该组件样式复制与网易云，或许会有些混乱，请不用care
    @import url("~/common/stylus/variable");
    .m-input
        display flex
        position: fixed;
        width 100%
        left 0
        top 0
        padding: 10px 10px;
        padding-bottom 4px
        .inputcover
            position: relative;
            width: 100%;
            height: 35px;
            padding: 0 30px;
            box-sizing: border-box;
            background: #ebecec;
            border-radius: 30px;
            margin-right 70px
            .u-svg-srch
                position: absolute;
                left: 0;
                top: 11.5px;
                margin: 0 8px;
                vertical-align: middle;
                width: 13px;
                height: 13px;
                background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==');
                display: inline-block;
                vertical-align: middle;
                background-position: 0 0;
                background-size: contain;
                background-repeat: no-repeat;
            .input
                width: 100%;
                height: 30px;
                line-height: 18px;
                background: rgba(0,0,0,0);
                font-size: 14px;
                color: #333;
                outline none
            .holder
                position: absolute;
                left: 30px;
                top 50%;
                transform translateY(-50%);
                font-size: 14px;
                color: #c9c9c9;
                background: rgba(0,0,0,0);
                pointer-events: none;
            .close
                position: absolute;
                right: 0;
                top: 0;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                .u-svg-empty
                    display: none;
                    vertical-align: middle;
                    display: inline-block;
                    vertical-align: middle;
                    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==')
                    background-position: 0 0;
                    background-size: contain;
                    background-repeat: no-repeat;
                    width: 14px;
                    height: 14px;

</style>
