export interface formFeedBack {

    id_form_feedback: number;
    form_name:string;
    form_update:string;

}


export interface coordByForm {

    id_coordinator_by_form: number;
    coordinador:string;
    id_form:number;
    date_update:string;

}


export interface campFeedback {

    id_camp_group?: number;
    camp_mane: string;
    date_ini: string;
    date_end: string;
    update_date: string;
    id_coordinator: string;
    state_camp:number;

} 

export interface questFeedback {

    id_quest_feedback?: number;
    id_type_quest: number;
    question_feedback: string;
    date_update: string;
    type_cues?:string;

}

export interface questType {
    id_type_cues:number;
    type_cues:string;
}

export interface camByVoluntInsert{
    id_camp_by_volt?:number;
    id_camp:number;
    id_voluntier:string;

}

export interface FormByCamp {
    id_camp_by_form?:number;	
    id_camp:number;
    id_form:number;
}

export interface FormByCampByVolt {
    id_form_feedback:number;
    form_name:string;
    form_update:string;
    id_camp_group:number;
    camp_mane:string;
    date_ini:string;
    date_end:string;
    update_date:string;
    id_coordinator:string;
    state_camp:string;
}