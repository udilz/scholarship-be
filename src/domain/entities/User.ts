export class User {
    constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public password: string,
        public role: string,
        public educational_background: string,
        public major: string,
        public funding_need: string,
        public preference: string,
        public created_at: Date,
        public updated_at: Date
    ) {}
}