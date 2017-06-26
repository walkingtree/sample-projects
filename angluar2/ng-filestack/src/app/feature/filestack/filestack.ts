declare var filestack;

import { Subscription } from 'rxjs/Subscription';
import { Component, HostListener, ElementRef, Renderer, EventEmitter, Output, Input, OnInit, OnDestroy } from '@angular/core';
import { AppConfigService } from "providers/services/app-config.services";

@Component({
    selector: "file-stack",
    templateUrl: "filestack.html"
})

export class FileStackComponent implements OnInit, OnDestroy {
    private el: HTMLElement;

    @Input("data-accept")
    private dataFormat: any;

    @Output("complete")
    private output: EventEmitter<any> = new EventEmitter<any>();

    private appConfigSubscriber: Subscription;


    constructor(private _elementRef: ElementRef, private _renderer: Renderer, private appConfigService: AppConfigService) {
        this.el = _elementRef.nativeElement;
    }

    ngOnInit() {

    }

    //open filestack on click event
    @HostListener("click", ['$event'])
    onFileStackFieldClick(event: MouseEvent) {
        let accept = (this.dataFormat || "").split(",");
        let maxFiles = this.el.getAttribute("data-maxfiles");
        if (this.appConfigSubscriber) {
            this.appConfigSubscriber.unsubscribe();
            this.appConfigSubscriber = null;
        }

        let filestackConfig = this.appConfigService.getFilestackConfig().key;
        let s3Config = this.appConfigService.getS3Config();
        let fileStackClient = filestack.init(filestackConfig, { policy: 'policy', signature: 'signature' });

        fileStackClient.pick({
            accept: accept,
            maxFiles: parseInt(maxFiles),
            /*fromSources: 'local_file_system',*/
            /*storeTo: {
                s3Config
            },*/
            onFileSelected: function(file) {
                return file;
            }
        })
        .then((result: any) => {
            if (result.filesFailed.length > 0) {
                this.output.emit({
                    success: false,
                    data: result.filesFailed
                });
            }
            else {
                result.filesUploaded = result.filesUploaded || [];
                this.output.emit({
                    success: true,
                    data: result.filesUploaded
                });
            }
        });
    }

    ngOnDestroy() {
        if (this.appConfigSubscriber) {
            this.appConfigSubscriber.unsubscribe();
            this.appConfigSubscriber = null;
        }
    }
}