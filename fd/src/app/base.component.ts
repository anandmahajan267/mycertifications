declare var NProgress: any;

export class BaseComponent {

    private isShowView: Boolean = false

    showView() {
        this.isShowView = true;
        NProgress.done();
    }

    hideView() {
        this.isShowView = false;
    }
}
