/**
 * Application config service
 */
import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {

    public filestackConfig : any = {
        key: 'AopksPQORR6IgXcMjzRQjz'
    };

    public s3Config : any = {
        s3Key : 'xxxxxxxxxxx',
        signatureVersion : 'xx',
        bucket : {
            customer : 'xxxxxxxxx',
            application : 'xxxxxxx',
            user : 'xxxxxx'
        }
    };
 
    constructor() {
        
    }

    //get filestack config
    getFilestackConfig() {
        return this.filestackConfig;
    }

    //get s3 config
    getS3Config () {
        return this.s3Config;
    }
}