import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRepository } from '../repositories/SurveysRepository'

class SurveyController{
    async create(req: Request, res: Response){
        const { title, description } = req.body

        const surveysRepository = getCustomRepository(SurveysRepository)

        
        const Survey =  await surveysRepository.create({ 
            title, description 
        })
        await surveysRepository.save(Survey)

        return res.status(201).json(Survey)
    }

    async show(req: Request, res: Response){

        const surveysRepository = getCustomRepository(SurveysRepository)
        const all = await surveysRepository.find()
        return res.send(all)

    }
}

export { SurveyController }

