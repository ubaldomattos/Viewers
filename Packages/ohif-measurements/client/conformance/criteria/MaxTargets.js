import { BaseCriterion } from './BaseCriterion';
import { _ } from 'meteor/underscore';

export const MaxTargetsSchema = {
    properties: {
        limit: {
            label: 'Max targets allowed in study',
            type: 'integer',
            minimum: 1
        }
    },
    required: ['limit']
};

export class MaxTargetsCriterion extends BaseCriterion {

    constructor(options) {
        super(options);
    }

    evaluate(data) {
        const measurementNumbers = _.uniq(_.map(data.targets, target => {
            return target.measurement.measurementNumber;
        }));

        let message;
        if (measurementNumbers.length > this.options.limit) {
            message = `The study should not have more than ${this.options.limit} targets.`;
        }

        return this.generateResponse(message);
    }

}