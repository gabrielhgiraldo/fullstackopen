interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

interface ExerciseValues {
    dailyExerciseHours: Array<number>
    target: number
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues=> {
    if (args.length < 4) throw new Error('Not enough arguments');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_arg0, _arg1, arg2, ...rest] = args;
    if (!isNaN(Number(arg2)) && rest.every(val => !isNaN(Number(val)))) {
        return {
            target: Number(arg2),
            dailyExerciseHours: rest.map(val => Number(val))
        };
    }
    else {
        throw new Error('provided values were not numbers!');
    }
};

const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Result => {
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.reduce((acc, val) => val > 0 ? acc + 1 : acc, 0);
    const average = dailyExerciseHours.reduce((acc, val) => acc + val, 0) / periodLength;
    const success = average >= target;
    let rating;
    let ratingDescription;
    if (average >= target) {
        rating = 3;
        ratingDescription = 'achieved target';
    }
    else if (average < target / 2) {
        rating = 1;
        ratingDescription = 'Nice try, but needs work.';
    }
    else {
        rating = 2;
        ratingDescription = 'Almost there, but not quite.';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
    const { target, dailyExerciseHours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyExerciseHours, target));
}
catch (error) {
    if (error instanceof Error) {
        console.log('Error, something bad happened, message: ', error.message);
    }
}
