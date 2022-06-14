<?php



namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Question;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class  QuestionUserSubscriber implements EventSubscriberInterface{
    private $security;
    public function __Construct(Security $security){
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['questionSetUser', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function questionSetUser(ViewEvent $event){

        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if($result instanceof Question && $method === "POST"){
            $user = $this->security->getUser();
            $result->setUser($user);
        }

    }
}