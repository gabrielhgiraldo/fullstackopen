interface HeightWeight {
    height: number
    weight: number
}
export const validHeightWeight = (height: any, weight: any): boolean => {
    return !isNaN(Number(height)) && !isNaN(Number(weight))
}

const parseBmiArguments = (args: Array<string>): HeightWeight => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')

    if(validHeightWeight(args[2], args[3])) {
        return { 
            height: Number(args[2]),
            weight: Number(args[3])
        }
    }
    else {
        throw new Error('Provided values are not numbers!')
    }
}

export const calculateBmi = (weight: number, height: number): string => {
    const bmi = weight / ((height / 100) ** 2)

    if (bmi < 16) { 
        return "underweight (severe thinness)"
    }
    if (bmi < 17) {
        return "underweight (moderate thinness)"
    }
    if (bmi < 18.5) {
        return "underweight (mild thinness)"
    }
    if (bmi < 25) {
        return "normal range"
    }
    if (bmi < 30) {
        return "overweight (pre-obese)"
    }
    if (bmi < 35) {
        return "obese (class I)"
    }
    if (bmi < 40) {
        return "obese (class II)"
    }
    return "obese (class III)"
}
try {
    const { height, weight } = parseBmiArguments(process.argv)
    console.log(calculateBmi(weight, height))
}
catch (error) {
    console.log('Error, something bad happened, message: ', error.message)
}
