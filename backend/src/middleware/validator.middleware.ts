import { Request, Response, NextFunction } from "express";

const checkRequireParams = (requireParams: string[]): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    var missingParams: string[] = [];
    var requestParams: any = req.query;

    if (Object.keys(req.params).length) requestParams = req.params;
    else if (Object.keys(req.body).length) requestParams = req.body;

    requireParams.forEach(r => {
      if (!requestParams || !requestParams[r]) {
        missingParams.push(r);
      }
    });
    if (missingParams.length) {
      return res.status(400).json({
        code: 1,
        message: 'Missing parameters: ' + missingParams.join(', ')
      });
    }
    else next();
  }
}

export {
  checkRequireParams
}