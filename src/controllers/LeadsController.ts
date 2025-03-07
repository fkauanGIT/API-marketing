import { Handler } from "express";
import { prisma } from "../database";
import { CreateLeadRequestSchema } from "../schemas/LeadsRequestSchema";
import { HttpError } from "../errors/HttpError";

export class LeadsController { 

    // GET Pegar todos os leads
    index: Handler = async(req, res, next) => {
        try{
            const leads = await prisma.lead.findMany()
            res.json(leads)
        } catch (error) {
            next(error)
        }
    }

    //GET Devolve um único lead
    show: Handler = async(req, res, next) => {
        try{
            const lead = await prisma.lead.findUnique({
                where: { id: Number(req.params.id) },
                include:{
                    groups: true,
                    campaigns: true
                }
            })

            if (!lead) throw new HttpError(404, "lead não encontrado")

            res.json(lead)
        } catch(error) {
            next(error)
        }
    }  

    // POST cria um novo lead
    create: Handler = async(req, res, next) => {
        try{
            const body = await CreateLeadRequestSchema.parse(req.body)
            const newLead = await prisma.lead.create({
                data: body
            })

            res.status(201).json(newLead)
        } catch (error){
            next(error)
        }
    }

    // PUT Atualiza um lead
    update: Handler = async(req, res, next) => {
        try{
            const lead = await prisma.lead.update({
                where: {id: Number(req.params.id)},
                data: req.body
            })

            if(!lead) throw new HttpError(404, "lead não encontrado")

            res.json(lead)
        } catch(error) {
            next(error)
        }
    }

    // DELETE Deleta um lead
    delete: Handler = async(req, res, next) => {
        try{
            const lead = await prisma.lead.delete({
                where: {id: Number(req.params.id)},
            })

            if(!lead) throw new HttpError(404, "lead não encontrado")

            res.json(lead)
        } catch(error) {
            next(error)
        }
    }
}  