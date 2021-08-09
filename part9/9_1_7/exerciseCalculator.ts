interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Result => {
    const periodLength = dailyExerciseHours.length
    const trainingDays = dailyExerciseHours.reduce((acc, val) => val > 0 ? acc + 1 : acc, 0)
    const average = dailyExerciseHours.reduce((acc, val) => acc + val, 0) / periodLength
    const success = average >= target
    let rating;
    let ratingDescription;
    if (average >= target) {
        rating = 3
        ratingDescription = 'achieved target'
    }
    else if (average < target / 2) {
        rating = 1
        ratingDescription = 'Nice try, but needs work.'
    }
    else {
        rating = 2
        ratingDescription = 'Almost there, but not quite.'
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))