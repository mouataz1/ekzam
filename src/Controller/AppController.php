<?php

namespace App\Controller;

use App\Entity\Exam;
use App\Entity\Module;
use App\Entity\Question;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;


class AppController extends AbstractController
{
    /**
     * @Route("/", name="app_app")
     */
    public function index(): Response
    {
        return $this->render('app/index.html.twig', []);
    }


    /**
     * @Route("/generate", name="app_generate", methods="POST")
     */
    public function generateExam(Request $request, EntityManagerInterface $em):Response
    {
        $data = json_decode($request->getContent(),true) ;
        $nbrQ = $data['nbrQu'];
        $module = $data['modul'];
        $dif = $data['dif'];

        $qst = $em->getRepository(Question::class)->findQstRelatedToModule($module,$dif,$nbrQ);

        $lastcode = $em->getRepository(Exam::class)->findOneBy([],['code'=>'desc']);
        $newcode = $lastcode->getId() + 1;
        $modul = $em->getRepository(Module::class)->find($module);


            $exam = new Exam();
            $exam->setTitle("Exam-".$modul->getName()."-".$newcode);
            $exam->setModule($modul);
            $exam->setCode($newcode);
            foreach ($qst as $q){
                $exam->addQuestion($q);
                $em->persist($exam);
            }
        $em->flush();

        return new JsonResponse("exam generer avec success", RESPONSE::HTTP_OK);


    }
}
